from django.contrib import admin

# Register your models here.
from .models import Rooms
from .models import Contacts

class RoomsAdmin(admin.ModelAdmin):
	def room_number_custom(self, obj):
		""" Customising rooms number field in admin list view """
		if obj.occupied:
			return "<div style='color: #cc0000; font-weight: bold;'>%s</div>" % obj.roomNumber
		else:
			return "<div style='color: #008000; font-weight: bold;'>%s</div>" % obj.roomNumber

	room_number_custom.allow_tags = True

	list_display = ('room_number_custom','floor','area','price','occupied')
	list_display_links = ('room_number_custom','floor')
	list_editable = ('area','price','occupied')
	list_filter = ('floor', 'occupied')

admin.site.register(Rooms, RoomsAdmin)

class ContactsAdmin(admin.ModelAdmin):
	list_display = ('webName','phoneNumber','email','address')
	list_editable = ('phoneNumber','email','address')
	list_display_links = ('webName',)

admin.site.register(Contacts, ContactsAdmin)