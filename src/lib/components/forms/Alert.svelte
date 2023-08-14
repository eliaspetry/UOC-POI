<script lang="ts">
	type alert = 'error' | 'success' | 'notification';

	let title = '',
		message = '',
		styling = '',
		type: alert = 'notification';

	export { title, message, type };

	$: {
		switch (type) {
			case 'error':
				styling = 'bg-red-100 text-red-700';
				break;
			case 'success':
				styling = 'bg-green-100 text-green-700';
				break;
			default:
				styling = 'bg-blue-100 text-blue-700';
		}
	}
</script>

<div class={`m-4 max-w-4xl rounded-md p-4 text-center ${styling}`} role="alert">
	<p class="break-words font-bold">{title}</p>
	<p class="break-words">{message}</p>
</div>
