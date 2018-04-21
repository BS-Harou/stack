import React, {Component} from 'react';
// import PropTypes from 'prop-types';

class RentDetail extends Component {
	static propTypes = {};

	static defaultProps = {};

	render() {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>💩</th>
						<th>Celkem</th>
						<th>Na jednoho</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Nájem</th>
						<td>16 000 Kč</td>
						<td>3 200 Kč</td>
					</tr>
					<tr>
						<th>Poplatky</th>
						<td>5 000 Kč</td>
						<td>1 000 Kč</td>
					</tr>
					<tr>
						<th>Výdaje</th>
						<td>300 Kč</td>
						<td>60 Kč</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th>Celkem</th>
						<th>21 300 Kč</th>
						<th>4 260 Kč</th>
					</tr>
				</tfoot>
			</table>
		);
	}
}

export default RentDetail;
