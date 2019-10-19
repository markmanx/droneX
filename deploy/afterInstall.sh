source ~/.bash_profile

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd /home/ec2-user/droneX/api
extract-zip api.zip .
npm run start

cd /home/ec2-user/droneX/frontend
extract-zip frontend.zip .
npx serve -l 3000 .

sudo su
sudo service nginx restart