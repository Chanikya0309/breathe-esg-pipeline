# Engineering Tradeoffs

Given the rapid 4-day prototype timeline, the following features were deliberately left out of scope:

1. **Asynchronous Background Workers (Celery & Redis):** Processing raw data runs synchronously within the standard request-response thread. For massive enterprise files (e.g., 50MB SAP logs), this would tie up web workers. A production build would leverage a background task framework like Celery.
2. **Live Environmental Multiplier Integrations:** Instead of implementing a live API connection to an environmental calculation clearinghouse (like Climatiq), the database relies on structured static calculation constants.
3. **Granular Role-Based Access Controls (RBAC):** To optimize development momentum, the dashboard is fully accessible without an authentication layer. A live deployment requires clear permission separation between data-uploading admins and data-signing analysts.