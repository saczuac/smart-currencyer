# SmartCurrencyer

A demo project in order to serve as a example of how to bind [AngularJS](https://angular.io/) and [Django-rest-framework](http://www.django-rest-framework.org/)


## Up and running

### Server

In the console run the following commands

+ Activate your virtualenv...
+ `pip install -r requirements.txt`
+ `python manage.py migrate`
+ `python manage.py loaddata fixtures/currencies.json`
+ `python manage.py runserver`
+ Go to [localhost](http://localhost:8000)

### Client

In the console run the following commands in order to develop

+ `python manage.py runserver`
+ `cd smart-currencyer-client`
+ `npm install`
+ `ng serve`
+ Then go to [localhost](http://localhost:4200)