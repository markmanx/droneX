#!/bin/bash
source ~/.bashrc

PATH=/home/ec2-user/.nvm/versions/node/v10.0.0/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/ec2-user/.local/bin:/home/ec2-user/bin
export PATH

echo $PATH
echo $(node -v)

cd /home/ec2-user/droneX/api
extract-zip api.zip .
npm run start

cd /home/ec2-user/droneX/frontend
extract-zip frontend.zip .
npx serve -l 3000 .

sudo su
sudo service nginx restart