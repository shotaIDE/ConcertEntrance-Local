# ConcertEntrance

## デプロイ手順

共通して必要な環境
- Docker
- Kubernetes
- [Kustomize](https://github.com/kubernetes-sigs/kustomize/blob/v1.0.3/README.md)

### 開発環境

```
cd ${Repository}
kustomize build overlays/development | kubectl apply -f -
```

### Tips

CronJobを即時実行する
```
kubectl create job scraping-debug --from=cronjob/scraping
```

### 商用環境

```
cd ${Repository}
kustomize build overlays/production | kubectl apply -f -
```
