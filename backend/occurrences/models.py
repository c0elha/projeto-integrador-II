from django.db import models
from users.models import User
from django.utils.translation import gettext_lazy as _
from datetime import datetime

def upload_image_occurrences(instance, filename):
    date = datetime.now().strftime("%Y%m%d%H%M%S")
    return f"{date}-{filename}"


class Categories(models.Model):
    name = models.CharField(max_length=180)
    description = models.CharField(max_length=320, blank=True, null=True)

class Occurrences(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    category = models.ForeignKey(Categories, on_delete=models.PROTECT)

    title = models.CharField(max_length=180)
    description = models.CharField(max_length=320, null=True)

    is_anonymous =  models.BooleanField(default=False)

    cep = models.CharField(max_length=50, verbose_name="CEP")
    number = models.CharField(max_length=12, verbose_name="Número", blank=True, null=True)

    latitude = models.IntegerField(verbose_name="Latitude")
    longitude = models.IntegerField(verbose_name="Longitude")

    class StatusOccurrences(models.TextChoices):
        NOT_COMPLETED = 'NOT_COMPLETED', _('Não concluida')
        COMPLETED = 'COMPLETED', _('Completa')
        DELETED = 'DELETED', _('Deletada')

    status = models.CharField(
        max_length=50,
        choices=StatusOccurrences.choices,
        default=StatusOccurrences.NOT_COMPLETED,
    )
    
    class StatusOccurrences(models.TextChoices):
        NOT_COMPLETED = 'NOT_COMPLETED', _('Não concluida')
        COMPLETED = 'COMPLETED', _('Completa')
        DELETED = 'DELETED', _('Deletada')

    status = models.CharField(
        max_length=50,
        choices=StatusOccurrences.choices,
        default=StatusOccurrences.NOT_COMPLETED,
    )

    image = models.ImageField(
        upload_to=upload_image_occurrences, blank=True, null=True)

    created_at = models.DateField(auto_now_add=True)

class Actions(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    occurrences = models.ForeignKey(Occurrences, on_delete=models.PROTECT)

    class typeAction(models.TextChoices):
        LIKE = 'LIKE', _('Curtir')

    type = models.CharField(
        max_length=50,
        choices=typeAction.choices,
        default=typeAction.LIKE,
    )

    created_at = models.DateField(auto_now_add=True)

class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    occurrences = models.ForeignKey(Occurrences, on_delete=models.PROTECT)

    description = models.CharField(max_length=320, null=True)
    
    created_at = models.DateField(auto_now_add=True)