from django.db import models

class CustomForm(models.Model):
    form_name = models.TextField()
    fields = models.JSONField()  # store dynamic form structure

    def __str__(self):
        return self.form_name


class SubmittedDetail(models.Model):
    pk_bint_id = models.BigAutoField(primary_key=True)
    fk_form = models.ForeignKey(CustomForm,on_delete=models.CASCADE)
    dat_created = models.DateTimeField(auto_now_add = True)
    fk_created = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    json_details = models.JSONField()

