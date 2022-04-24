import type { Prisma, Site } from '@prisma/client';

export function calc(
	formData: FormData,
	siteEntry: Prisma.SiteEntryCreateInput & { total: bigint; managerSpentAmount: bigint },
	site: Site
) {
	for (let item of formData.entries()) {
		const [key, value] = item;
		switch (key) {
			case 'note':
				siteEntry.note = value;
				break;
			default:
				const [field, subfield] = key.split('.');
				!siteEntry[field] && (siteEntry[field] = {});
				switch (field) {
					case 'other':
					case 'other2':
						switch (subfield) {
							case 'paid':
								siteEntry[field].paid = true;
								siteEntry.managerSpentAmount += siteEntry[field].cost;
								break;
							case 'cost':
								siteEntry[field].cost = BigInt(value);
								siteEntry.total += siteEntry[field].cost;
								site && (site.total[field] += siteEntry[field].cost);
								break;
							case 'quantity':
								siteEntry[field].quantity = value;
								break;
						}
						break;
					default:
						switch (subfield) {
							case 'paid':
								siteEntry[field].paid = true;
								siteEntry.managerSpentAmount += siteEntry[field].cost;
								break;
							case 'cost':
								siteEntry[field].cost = BigInt(value);
								siteEntry.total += siteEntry[field].cost;
								site && (site.total[field].cost += siteEntry[field].cost);
								break;
							case 'quantity':
								siteEntry[field].quantity = BigInt(value);
								site && (site.total[field].quantity += siteEntry[field].quantity);
								break;
						}
				}
		}
	}
}
