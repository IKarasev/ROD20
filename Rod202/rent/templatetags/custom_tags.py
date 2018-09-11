from django import template

register = template.Library()

def decimalformat(value):
	return "{:,}".format(value).replace(','," ").replace('.',',')

register.filter('decimalformat',decimalformat)