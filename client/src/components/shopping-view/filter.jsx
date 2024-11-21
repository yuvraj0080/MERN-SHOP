import { filterOptions } from "@/config";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItems) => (
          <div key={keyItems}>
            <div>
              <h3 className="text-base font-semibold">{capitalizeFirstLetter(keyItems)}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItems].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 font-normal"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItems] &&
                        filters[keyItems].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItems, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
