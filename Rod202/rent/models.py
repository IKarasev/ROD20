from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class Rooms(models.Model):
	""" database of the rooms
		Name: rooms
		Objects:
		roomNumber	- number of the room, unique, primary key, char(5)
		floor		- floor number, Integer
		area		- area of the room, Decimal
		price		- room price, Decimal
		occupied	- is room occupied, Boolean
	"""
	roomNumber = models.CharField(max_length=5, primary_key=True, verbose_name="Номер комнаты")
	floor = models.IntegerField(verbose_name="Этаж")
	area = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Площадь")
	price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Цена")
	occupied = models.BooleanField(verbose_name="Занята")

	class Meta:
		verbose_name = "Комната"
		verbose_name_plural = "Комнаты"
		ordering = ('roomNumber',)

	def __str__(self):
		name = "Комната" + self.roomNumber +" - "
		if self.occupied:
			return "Комната " + self.roomNumber +" - занята"
		else:
			return "Комната " + self.roomNumber +" - свободна"

class Contacts(models.Model):
	webName = models.CharField(max_length=5, verbose_name="Индентификатор")
	phoneNumber = models.CharField(max_length=18, verbose_name="Телефон")
	email = models.CharField(max_length=30, verbose_name="E-mail")
	address = models.CharField(max_length=100, verbose_name="Аддрес")

	class Meta:
		verbose_name = "Контакты"
		verbose_name_plural = "Контакты"

	def save(self, *args, **kwargs):
		if Contacts.objects.exists() and not self.pk:
			raise ValidationError('Может быть только одна запись контактов')
		return super(Contacts, self).save(*args, **kwargs)
