# SmartCurrencyer

A demo project in order to serve as a example of how to bind [AngularJS](https://angular.io/) and [Django-rest-framework](http://www.django-rest-framework.org/)


## PROD up and running

In the console run the following commands

+ Activate your virtualenv...
+ `pip install -r requirements.txt`
+ `cp smart_currencyer/settings_env.example.py smart_currencyer/settings_env.py`
+ `python manage.py migrate`
+ `python manage.py loaddata fixtures/currencies.json`
+ Create some users with: `python manage.py createsuperuser`
+ `cd static/smart-currencyer-client`
+ `npm install -g @angular/cli`
+ `npm install`
+ `ng build`
+ `cd ..` Two times
+ `python manage.py runserver`
+ Go to [localhost](http://localhost:8000)
+ Login with some users, create wallets, make transactions (notice that the sender and the receiver must have a wallet of same currency)


## DEV up and running

### Server

In the console run the following commands

+ Activate your virtualenv...
+ `pip install -r requirements.txt`
+ `cp smart_currencyer/settings_env.example.py smart_currencyer/settings_env.py`
+ `python manage.py migrate`
+ `python manage.py loaddata fixtures/currencies.json`
+ Create some users with: `python manage.py createsuperuser`
+ `python manage.py runserver`


+ You can go to [localhost](http://localhost:8000/admin) and do crud from here but better use the client! 

### Client

In the console run the following commands in order to develop

+ `python manage.py runserver`
+ `cd static/smart-currencyer-client`
+ `npm install -g @angular/cli`
+ `npm install`
+ `ng serve --open`
+ Login with some users, create wallets, make transactions (notice that the sender and the receiver must have a wallet of same currency)
