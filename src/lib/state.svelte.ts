let showLoginModelState = $state(false);

export function showLoginModel() {
	function toggle() {
		showLoginModelState = !showLoginModelState;
	}

	return {
		get value() {
			return showLoginModelState;
		},
		toggle
	};
}

let selectedFeed = $state( 'discovery' );

export function getSelectedFeed() {
  return {
    get value() {
      return selectedFeed;
    },

    set(feed: 'discovery' | 'following') {
      selectedFeed = feed;
    }
  }
}