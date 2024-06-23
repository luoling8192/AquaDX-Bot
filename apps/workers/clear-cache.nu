let tmpfile = mktemp -t --suffix .json
pnpm wrangler kv:key list --namespace-id 16a7f633b5374174a3e44a4ebd4abac6 --prefix image: | from json | get name | to json | save -f $tmpfile
pnpm wrangler kv:bulk delete --namespace-id 16a7f633b5374174a3e44a4ebd4abac6 $tmpfile
rm $tmpfile
