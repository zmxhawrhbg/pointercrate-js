import Builder from '../../base/builder';
import Permissions from '../user/permissions';

import Player from './player';
import PlayerListingFilters from './playerpagination';
import RankedPlayer from './rankedplayer';
import RankedPlayerListingFilters from './rankedplayerpagination';

export default class PlayerBuilder extends Builder {
	/**
	 * gets listed form of player
	 * @param id id of player
	 */
	async from_id(id: number) {
		return this.client._get_req(Player, `v1/players/${id}`)
	}

	/**
	 * this endpoint requires extended access permissions
	 * @param filters Pagination and filters for player listing
	 */
	async list(filters?: PlayerListingFilters) {
		if (this.client.user &&
			this.client.user.implied_permissions.includes(Permissions.ExtendedAccess)) {
			return this.client._get_req_list(Player, `v1/players/`, filters);
		} else {
			throw "Player listing endpoint requires ExtendedAccess!";
		}
	}

	/**
	 * this endpoint doesn't require extended access permissions
	 * returns a different form of player
	 * @param filters Pagination and filters for ranked player listing
	 */
	async by_ranking(filters?: RankedPlayerListingFilters) {
		return this.client._get_req_list(RankedPlayer, `v1/players/ranking/`, filters);
	}
}
