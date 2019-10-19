#!/bin/bash
source ~/.bashrc

cd /home/ec2-user/droneX/api
sudo -H -u ec2-user bash -c 'extract-zip api.zip . && npm run start'

cd /home/ec2-user/droneX/frontend
sudo -H -u ec2-user bash -c 'extract-zip frontend.zip . && npx serve -l 3000 .'

sudo su
sudo service nginx restart