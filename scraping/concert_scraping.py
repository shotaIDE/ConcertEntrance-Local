# coding: UTF-8

import sys
import argparse
import re
from datetime import datetime, timedelta, timezone
from time import sleep
import json

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import Select

import requests

parser = argparse.ArgumentParser()
parser.add_argument('--debug', action='store_true', default=False)
arguments = parser.parse_args()

IS_DEBUG = arguments.debug
if IS_DEBUG:
    import ptvsd
    ptvsd.enable_attach('my_secret', address=('0.0.0.0', 3000))
    ptvsd.wait_for_attach()

SELENIUM_HUB = 'http://selenium-hub:4444/wd/hub'
WEB_HOST = 'http://note:3001'

response = requests.get(WEB_HOST + '/api/delete')
if response.status_code != 200:
    print(response)
    exit()

driver = webdriver.Remote(
    command_executor=SELENIUM_HUB,
    desired_capabilities=DesiredCapabilities.CHROME,
)
driver.get('http://search.ebravo.jp/')

current_date = datetime.now()
limit_date = current_date + timedelta(days=14)

select = Select(driver.find_element_by_xpath('//*[@id="ConcertSearchReleaseDateFromYear"]'))
select.select_by_value("{:04d}".format(current_date.year))
select = Select(driver.find_element_by_xpath('//*[@id="ConcertSearchReleaseDateFromMonth"]'))
select.select_by_value("{:02d}".format(current_date.month))
select = Select(driver.find_element_by_xpath('//*[@id="ConcertSearchReleaseDateFromDay"]'))
select.select_by_value("{:02d}".format(current_date.day))

select = Select(driver.find_element_by_xpath('//*[@id="ConcertSearchReleaseDateToYear"]'))
select.select_by_value("{:04d}".format(limit_date.year))
select = Select(driver.find_element_by_xpath('//*[@id="ConcertSearchReleaseDateToMonth"]'))
select.select_by_value("{:02d}".format(limit_date.month))
select = Select(driver.find_element_by_xpath('//*[@id="ConcertSearchReleaseDateToDay"]'))
select.select_by_value("{:02d}".format(limit_date.day))

driver.find_element_by_xpath('//*[@id="ConcertSearchGenreId1"]').click() 
driver.find_element_by_xpath('//*[@id="ConcertSearchGenreId3"]').click()
driver.find_element_by_xpath('//*[@id="ConcertSearchGenreId2"]').click()
driver.find_element_by_xpath('//*[@id="ConcertSearchGenreId4"]').click()
driver.find_element_by_xpath('//*[@id="ConcertSearchGenreId5"]').click()
driver.find_element_by_xpath('//*[@id="ConcertSearchGenreId34"]').click()

driver.find_element_by_xpath('//*[@id="hope_search"]/div[8]/div/dl/dd[12]/label/input').click()

driver.find_element_by_xpath('//*[@id="IdHopeSearchSubmit"]').click()

summaries = []

while True:
    summary_elems = driver.find_elements_by_class_name('listSummary')
    for summary_elem in summary_elems:
        title_elem = summary_elem.find_element_by_tag_name('a')
        title = title_elem.text
        url = title_elem.get_attribute('href')
        summaries.append({
            'title': title,
            'url': url
        })
        print(title)

    try:
        driver.find_element_by_partial_link_text('次へ').click()
    except Exception:
        break

details = []

DATE_PATTERN = r"([0-9][0-9][0-9][0-9])/([0-9][0-9])/([0-9][0-9]).*"
TIME_PATTERN = r"([0-9][0-9]):([0-9][0-9])"
date_re = re.compile(DATE_PATTERN)
time_re = re.compile(TIME_PATTERN)

for summary in summaries:
    src_url = summary['url']
    driver.get(src_url)
    print(src_url)
    held_date_raw = driver.find_element_by_xpath('//*[@id="detail_area"]/div/table/tbody/tr[1]/td[2]/p').text
    held_time_raw = driver.find_element_by_xpath('//*[@id="detail_area"]/div/table/tbody/tr[2]/td[2]/p').text
    on_sale_date_raw = driver.find_element_by_xpath('//*[@id="detail_area"]/div/table/tbody/tr[1]/td[4]/p').text
    held_place = driver.find_element_by_xpath('//*[@id="detail_area"]/div/table/tbody/tr[3]/td[2]/p').text
    description = driver.find_element_by_xpath('//*[@id="detail_area"]/div/table/tbody/tr[4]/td[2]').text

    held_date = held_date_raw[:10]
    held_time = held_time_raw[:5]
    on_sale_date = on_sale_date_raw[:10]

    detail = {
        'title': summary['title'],
        'srcUrl': src_url,
        'heldDate': held_date,
        'heldTime': held_time,
        'onSaleDate': on_sale_date,
        'heldPlace': held_place,
        'description': description
    }

    date_matched = date_re.match(held_date)
    time_matched = time_re.match(held_time)
    if date_matched and time_matched:
        held_datetime = datetime.strptime(
            "{:} {:}".format(held_date, held_time),
            '%Y/%m/%d %H:%M')
        detail['heldTimestamp'] = held_datetime.replace(tzinfo=timezone.utc).timestamp()
        print(held_datetime)
    elif date_matched:
        held_datetime = datetime.strptime(
            held_date,
            '%Y/%m/%d')
        detail['heldTimestamp'] = held_datetime.replace(tzinfo=timezone.utc).timestamp()
        print(held_datetime)
    else:
        print("{:} {:}".format(held_date, held_time))

    details.append(detail)

driver.quit()

for detail in details:
    response = requests.post(WEB_HOST + '/api/write', data=detail)

f = open('temp/data.json', 'w')
json.dump(details, f, ensure_ascii=False, indent=4, separators=(',', ': '))
