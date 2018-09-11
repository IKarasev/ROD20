from django import forms
from .models import Rooms

class ApplicationForm(forms.Form):
	options = (
		('11','11'),
		('12','12'),
		('13','13'),
	)

	def_error_msgs = {
		'required': u'Обязательно заполните это поле',
    	'invalid': u'Пожалуйста, введите верное значение',
	}

	name = forms.CharField(label='Как к вам обращаться:', max_length=150, error_messages=def_error_msgs)
	back_email = forms.EmailField(label='Ваша электронная почта:', max_length=30, error_messages=def_error_msgs)
	phone = forms.CharField(label='Номер телефона:', max_length=150, required=False)
	#roomNumber = forms.MultipleChoiceField(label='Номер офиса:', widget=forms.SelectMultiple(), choices=options, required=False, error_messages=def_error_msgs)
	description = forms.CharField(label='Задайте Ваш вопрос:', max_length=300, required=False, widget=forms.Textarea)

	def as_div(self):
		return self._html_output(
			normal_row = '<div class="application-form-line"><div class="application-form-cell">%(label)s</div><div class="application-form-cell">%(field)s</div></div>',
			error_row = '<div>%s</div>',
			row_ender = '</div>',
			help_text_html = '<div>%s</div>',
			errors_on_separate_row = False
		)
