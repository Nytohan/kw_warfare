import Actor5e from '../../../systems/dnd5e/module/actor/entity.js';
import {d20Roll} from '../../../systems/dnd5e/module/dice.js';

const attributeLabels = {
	"attack": "KW_WARFARE.Attack",
	"power": "KW_WARFARE.Power",
	"morale": "KW_WARFARE.Morale",
	"command": "KW_WARFARE.Command"
};

export default function extendActor () {

	Actor5e.prototype.rollKWUnitAttribute = function (attr, options = {}) {
		const stats = this.getFlag('kw-warfare', 'stats');
		if (!stats) {
			return;
		}

		const parts = ['@mod'];
		const data = {mod: stats[attr]};
		const rollData = mergeObject(options, {
			parts: parts,
			data: data,
			title: game.i18n.localize(attributeLabels[attr]),
			messageData: {
				speaker: ChatMessage.getSpeaker({actor: this})
			}
		});

		return d20Roll(rollData);
	};
}
