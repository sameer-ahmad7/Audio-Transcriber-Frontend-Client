# set up basic system packages
apt-get update
apt-get install python-pip wget zip -y

# install aws cli
python -m pip install awscli

# install angular
export NG_CLI_ANALYTICS=ci # https://github.com/angular/angular-cli/blob/master/docs/design/analytics.md
npm i -g @angular/cli

# test installed components
aws --version 

# install package dependencies
npm i

# set compile-time variables
make set-ng-vars