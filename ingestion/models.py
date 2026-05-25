from django.db import models
import uuid

class IngestionJob(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_type = models.CharField(max_length=50) # 'SAP', 'UTILITY', or 'CONCUR'
    created_at = models.DateTimeField(auto_now_add=True)

class NormalizedActivity(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Review'),
        ('SUSPICIOUS', 'Suspicious'),
        ('FAILED', 'Failed'),
        ('APPROVED', 'Approved')
    ]
    
    job = models.ForeignKey(IngestionJob, on_delete=models.CASCADE)
    source_type = models.CharField(max_length=50) 
    scope_category = models.CharField(max_length=10) # 'Scope 1', 'Scope 2', 'Scope 3'
    
    # Raw Data Info
    raw_quantity = models.CharField(max_length=100)
    raw_unit = models.CharField(max_length=50)
    
    # Standardized Data Info
    normalized_quantity = models.FloatField(default=0.0)
    normalized_unit = models.CharField(max_length=50)
    
    # Tracking and Business logic
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    validation_notes = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.source_type} - {self.status}"