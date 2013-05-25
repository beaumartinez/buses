# apt-get

apt-get update

# Necessary for add-apt-repository
apt-get install -y python-software-properties

add-apt-repository -y ppa:chris-lea/node.js
add-apt-repository -y ppa:nginx/stable
apt-get update

apt-get install -y git nginx nodejs python python-pip

# virtualenv

pip install --upgrade pip
hash -r

pip install -r /vagrant/etc/requirements.txt

# nginx

rm /etc/nginx/sites-enabled/default

ln -s /vagrant/etc/nginx-development.conf /etc/nginx/sites-available/development
ln -s /vagrant/etc/nginx-production.conf /etc/nginx/sites-available/production

ln -s /etc/nginx/sites-available/development /etc/nginx/sites-enabled/development

service nginx restart

# grunt and ting

npm install -g bower grunt-cli requirejs

(
    cd /vagrant
    npm install
    grunt
)

r.js -o /vagrant/etc/build.js

# upstart

# We're symlinking the Upstart job. Upstart doesn't work well with symlinks, so
# we have to call "initctl reload-configuration" explicitly for it to recognize
# it
ln -s /vagrant/etc/upstart.conf /etc/init/buses.conf
initctl reload-configuration
service buses start
