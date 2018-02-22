namespace OcEvent {
	export class Event {
		private subscriptions = [];
		public subscribe(callback: (payload?: any) => void) {
			this.subscriptions.push(callback);
		}

		public trigger(payload?: any) {
			for (let i = 0; i < this.subscriptions.length; i++) {
				if (this.subscriptions[i]) {
					this.subscriptions[i].callback(payload);
				}
			}
		}
	}
}
