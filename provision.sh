# apt-get

deb http://nginx.org/packages/ubuntu/ precise nginx
add-apt-repository ppa:chris-lea/node.js

apt-get update

apt-get install -y nginx npm nodejs python python-pip

# virtualenv

pip install -r /vagrant/requirements.txt

# nginx

rm /etc/nginx/sites-available/default
ln -s /vagrant/nginx.conf /etc/nginx/sites-available/default
service nginx restart

# r.js

npm install -g requirejs
r.js -o /vagrant/build.js

# upstart

ln -s /vagrant/upstart.conf /etc/init/buses.conf
initctl reload-configuration
service buses start
