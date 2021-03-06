# ConcertEntrance

## デプロイ手順

共通して必要な環境
- Docker
- Kubernetes
- [Kustomize](https://github.com/kubernetes-sigs/kustomize/blob/v1.0.3/README.md)

### 開発環境

デプロイ
```
cd ${Repository}
kustomize build kubernetes/overlays/development | kubectl apply -f -
```

### Tips

CronJobを即時実行する
```
kubectl create job scraping-debug --from=cronjob/scraping
```

### 商用環境

Google Cloud Platformのコンソール上で実施する

イメージの更新とリポジトリへの登録（イメージの更新が無い場合は，実施する必要はない）
```
cd ${Repository}
PROJECT_ID="$(gcloud config get-value project -q)"
gcloud config set project $PROJECT_ID
gcloud config set compute/zone us-central1-b
MYSQL_VERSION=v1.0
docker build mysql -t gcr.io/$PROJECT_ID/mysql:$MYSQL_VERSION
gcloud docker -- push gcr.io/$PROJECT_ID/mysql:$MYSQL_VERSION
NOTE_VERSION=v1.0
docker build note -t gcr.io/$PROJECT_ID/note:$NOTE_VERSION
gcloud docker -- push gcr.io/$PROJECT_ID/note:$NOTE_VERSION
SCRAPING_VERSION=v1.1
docker build scraping -t gcr.io/$PROJECT_ID/scraping:$SCRAPING_VERSION
gcloud docker -- push gcr.io/$PROJECT_ID/scraping:$SCRAPING_VERSION
```

永続ディスクの作成（1回実施すればよい）
```
gcloud compute disks create --size 200GB mysql-disk
```

デプロイ
```
cd ${Repository}
kustomize build kubernetes/overlays/production | kubectl apply -f -
```
