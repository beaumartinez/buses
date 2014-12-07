set +e

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
ln -s /vagrant/etc/nginx.conf /etc/nginx/sites-available/buses
ln -s /etc/nginx/sites-available/buses /etc/nginx/sites-enabled/buses

service nginx restart

# grunt and ting

npm install -g bower grunt-cli

(
    cd /vagrant
    npm install
    grunt bower && grunt
)

# upstart

# We're symlinking the Upstart jobs. Upstart doesn't work well with symlinks, so
# we have to call "initctl reload-configuration" explicitly for it to recognize
# it

ln -s /vagrant/etc/upstart.conf /etc/init/buses.conf
ln -s /vagrant/etc/grunt-watch-upstart.conf /etc/init/grunt-watch.conf
initctl reload-configuration

service buses start
service grunt-watch start
