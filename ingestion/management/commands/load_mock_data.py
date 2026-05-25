from django.core.management.base import BaseCommand
from ingestion.models import IngestionJob, NormalizedActivity

class Command(BaseCommand):
    help = "Simulates an enterprise ingestion run by processing realistic, messy data layouts."

    def handle(self, *args, **kwargs):
        # 1. Clear out any old rows so we start totally fresh every time we run this
        NormalizedActivity.objects.all().delete()
        IngestionJob.objects.all().delete()

        # 2. Establish a shared pipeline run ID (The Ingestion Job)
        job = IngestionJob.objects.create(source_type="ENTERPRISE_BATCH_01")

        # --- DATA SOURCE 1: SAP PROCUREMENT (Scope 1 - Fuel) ---
        # Real-world behavior: Uses technical/German columns, raw text descriptions [cite: 9, 26]
        NormalizedActivity.objects.create(
            job=job,
            source_type="SAP",
            scope_category="Scope 1",
            raw_quantity="1200", 
            raw_unit="L",               
            normalized_quantity=1200.0,
            normalized_unit="Liters",
            description="MBLNR:50001234 | MATNR:M-01 | DIESEL FUEL - Plant HYD1", 
            status="PENDING"
        )

        # --- DATA SOURCE 2: UTILITY DATA (Scope 2 - Electricity) ---
        # Real-world behavior: Non-calendar monthly periods, usage anomalies [cite: 9, 30]
        NormalizedActivity.objects.create(
            job=job,
            source_type="UTILITY",
            scope_category="Scope 2",
            raw_quantity="95000",
            raw_unit="kWh",
            normalized_quantity=95000.0,
            normalized_unit="kWh",
            description="Electricity Bill - Account 102394822 | Billing Period: Jan 12 to Feb 11", 
            status="SUSPICIOUS",
            validation_notes="FLAGGED ANOMALY: Usage shows an unexplained 400% spike compared to the baseline average." 
        )

        # --- DATA SOURCE 3: CORPORATE TRAVEL (Scope 3 - Flights) ---
        # Real-world behavior: Uses airport codes instead of raw distances [cite: 9, 33]
        NormalizedActivity.objects.create(
            job=job,
            source_type="CONCUR",
            scope_category="Scope 3",
            raw_quantity="HYD-DEL",     
            raw_unit="IATA_CODES",
            normalized_quantity=1250.0, 
            normalized_unit="Passenger-km",
            description="Concur Booking TRIP-99214 | Flight Segment: HYD to DEL | Cabin Class: Business", 
            status="PENDING"
        )

        self.stdout.write(self.style.SUCCESS("Successfully processed and ingested messy enterprise data sets!"))