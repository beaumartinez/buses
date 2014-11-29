# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure('2') do |config|
    config.vm.box = 'trusty64'
    config.vm.box_url = 'https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box'

    config.vm.network :forwarded_port, guest: 80, host: 8080

    config.vm.provider 'virtualbox' do |v|
        v.customize ['setextradata', :id, 'VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant-root', '1']
    end

    config.vm.provision :shell, :path => 'etc/provision.sh'
end
