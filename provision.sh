# apt-get

apt-get update

# Necessary for add-apt-repository
apt-get install -y python-software-properties

add-apt-repository -y ppa:chris-lea/node.js
add-apt-repository -y ppa:nginx/stable
apt-get update

apt-get install -y nginx nodejs python python-pip

# virtualenv

pip install --upgrade pip
hash -r

pip install -r /vagrant/requirements.txt

# nginx

rm /etc/nginx/sites-available/default
ln -s /vagrant/nginx.conf /etc/nginx/sites-available/default
service nginx restart

# r.js

npm install -g requirejs
r.js -o /vagrant/build.js

# upstart

# We're symlinking the Upstart job. Upstart doesn't work well with symlinks, so
# we have to call "initctl reload-configuration" explicitly for it to recognize
# it
ln -s /vagrant/upstart.conf /etc/init/buses.conf
initctl reload-configuration
service buses start
