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
    color = models.CharField(max_length=180, blank=True, null=True, default='')

class Occurrences(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    category = models.ForeignKey(Categories, on_delete=models.PROTECT)

    title = models.CharField(max_length=180)
    description = models.CharField(max_length=320, null=True)

    is_anonymous =  models.BooleanField(default=False)

    cep = models.CharField(max_length=50, verbose_name="CEP", blank=True, null=True)
    number = models.CharField(max_length=12, verbose_name="Número", blank=True, null=True)

    street = models.CharField(max_length=50, verbose_name="Rua", blank=True, null=True, default='')
    complement = models.CharField(max_length=50, verbose_name="Compemento", blank=True, null=True, default='')
    point = models.CharField(max_length=50, verbose_name="Ponto", blank=True, null=True, default='')
    neighborhood = models.CharField(max_length=50, verbose_name="Bairro", blank=True, null=True, default='')
    city = models.CharField(max_length=50, verbose_name="Cidade", blank=True, null=True, default='')
    uf = models.CharField(max_length=50, verbose_name="UF", blank=True, null=True , default='')

    latitude = models.CharField(max_length=120,verbose_name="Latitude")
    longitude = models.CharField(max_length=120, verbose_name="Longitude")

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