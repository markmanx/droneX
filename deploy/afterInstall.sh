source ~/.bash_profile

cd /home/ec2-user/droneX/api
extract-zip api.zip .
npm run start

cd /home/ec2-user/droneX/frontend
extract-zip frontend.zip .
npx serve -l 3000 .

sudo service nginx restart