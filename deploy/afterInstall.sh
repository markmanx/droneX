source /home/ec2-user/.bash_profile

cd /home/ec2-user/droneX/api
unzip api.zip
npm run start

cd /home/ec2-user/droneX/frontend
unzip frontend.zip
npx serve -l 3000 .

sudo service nginx restart