# kanban-django
This project is an attempt to make a one page kanban board app using Django Rest Framework and React. Tools used in this project include node, npm, webpack, django-webpack-loader, and babel.


This project is incomplete and is currently broken. My react app can acquire api data via a GET request but does not have a working form to POST to the api.
## Installation
0. Prologue: This project uses [python3](https://www.python.org/) and [nodejs](https://nodejs.org/en/). Please make sure these tools are available.
1. Clone this git repository: `git clone https://github.com/gcrowder/kanban-django.git`.

2. Install the Python dependencies: `pip install -r requirements.txt`

3. Install the JavaScript dependencies: From within the kanban directory (which should have a package.json file) run `npm install`.

4. Create a database and update kanban/settings.py with the new database settings. I used a postgresql database but any django supported database will do. I put both my SECRET_KEY and my database settings in a secrets.py file.

5. Run the django server: `python manage.py runserver`

6. Navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000).
