if [ "$(id -u)" == 0 ]; then 
  echo "Do not run as root"
  exit 1
fi