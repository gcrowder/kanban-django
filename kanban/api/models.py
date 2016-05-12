from django.db import models


class Task(models.Model):
    status_choices = (
                ('Back Burner', 'Back Burner'),
                ('On Deck', 'On Deck'),
                ('In Process', 'In Process'),
                ('Complete', 'Complete'))
    priority_choices = (
                ('Glacial', 'Glacial'),
                ('Sloth', 'Sloth'),
                ('Snail', 'Snail'),
                ('Rabbit', 'Rabbit'),
                ('The Flash', 'The Flash'))
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=status_choices)
    priority = models.CharField(max_length=15, choices=priority_choices)
