# apt-get

deb http://nginx.org/packages/ubuntu/ precise nginx
add-apt-repository ppa:chris-lea/node.js

apt-get update

apt-get install -y nginx npm nodejs python python-pip

# virtualenv

# pip install virtualenv
# 
# mkdir -p /home/vagrant/.env/
# virtualenv --distribute --no-site-packages /home/vagrant/.env/buses 
# . /home/vagrant/.env/buses/bin/activate

pip install -r /vagrant/requirements.txt

# nginx

rm /etc/nginx/sites-available/default
ln -s /vagrant/nginx.conf /etc/nginx/sites-available/default
service nginx restart

# r.js

npm install -g requirejs
