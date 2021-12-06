check_file() {
  file=$1

  if [[ -z ${!file} ]]; then
    echo ensure $file is set
    exit 1
  fi

  if [[ ! -e ${!file} ]]; then
    echo ensure file ${!file} exists
    exit 1
  fi
}

check_var() {
  file=$1

  if [[ -z ${!file} ]]; then
    echo ensure variable, $file, is set
    exit 1
  fi
}

timestamp() {
  date +"%s"
}

command() {
  commnd=$1
  namespace=$2

  if [[ $commnd == "apply" ]]; then
    echo "oc -n ${namespace} apply -f -"
  elif [[ $commnd == "delete" ]]; then
    echo "oc -n ${namespace} delete -f -"
  else
    echo 'cat'
  fi
}
