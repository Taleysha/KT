class DataSyncService:
    def __init__(self):
        self.led_system = None
        self.community_system = None
    
    async def sync_alert(self, alert_data: Dict):
        # Filter sensitive data
        public_data = self.filter_sensitive_data(alert_data)
        
        # Send to community system
        await self.community_system.create_alert(public_data)
    
    def filter_sensitive_data(self, data: Dict) -> Dict:
        # Remove sensitive fields
        filtered = data.copy()
        sensitive_fields = ["criminal_history", "investigation_details"]
        for field in sensitive_fields:
            filtered.pop(field, None)
        return filtered
