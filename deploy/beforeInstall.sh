source ~/.bash_profile

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

rm -rf /home/ec2-user/droneX/api || true
rm -rf /home/ec2-user/droneX/frontend || true
rm -f /etc/nginx/sites-enabled/droneX.nginx.conf || true