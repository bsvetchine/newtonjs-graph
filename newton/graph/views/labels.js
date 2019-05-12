const d3 = require('d3')
const View = require('./view')

const fixedRadius = 12

/**
 * Encapsulates what is needed to create the labels of nodes
 * of the network graph
 *
 * @extends View
 */
class Labels extends View {
	/**
	 *
	 * @param {Object} options
	 * @param {String} [options.dom = window.document] - DOM reference, required for testing
	 * @param {String} [options.container] - HTML identifier used by for d3
	 */
	constructor (options = {}) {
		super(options)
	}

	render (data) {
		let labels = d3.select(this.dom)
			.select(this.container)
			.selectAll('.label')
			.data(data.nodes, (d) => d.id)

		this.emit('exit', labels.exit())
		labels.exit()
			.remove()

		this.emit('enter', labels.enter())
		labels = labels
			.enter()
				.append('text')
			.merge(labels)
				.text((node) => node.label)
				.attr('id', (node) => 'label-' + node.id)
				.attr('class', (node) => 'label status-' + node.status)
				.attr('dx', (node) => node.cx)
				.attr('dy', (node) => node.cy)

		this.emit('update', labels)
		this.selection = labels
	}

	position () {
		this.selection
			.attr('x', (d) => d.x)
			.attr('y', (d) => d.y + fixedRadius*2.5)
	}
}

module.exports = Labels