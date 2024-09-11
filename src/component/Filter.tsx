import { Button, Checkbox } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import * as React from 'react';

const filterTypes = [
  {
    value: 'name-asc',
    label: 'Name',
    icon: <ArrowDropUpIcon />,
  },
  {
    value: 'name-dsc',
    label: 'Name',
    icon: <ArrowDropDownIcon />,
  },
  {
    value: 'price-asc',
    label: 'Price',
    icon: <ArrowDropUpIcon />,
  },
  {
    value: 'price-dsc',
    label: 'Price',
    icon: <ArrowDropDownIcon />,
  },
];

function Filter({
  filterToppingSelected,
  filterToppings,
  onSetFilterToppingSelected,
  filterType,
  onSetFilterType,
}: {
  filterToppingSelected: string[];
  filterToppings: string[];
  onSetFilterToppingSelected: (filter: string[]) => void;
  filterType: string;
  onSetFilterType: (filter: string) => void;
}) {
  const [showMenu, setShowMenu] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    onSetFilterType(event.target.value);
  };

  return (
    <div>
      <div className='flex justify-between gap-4'>
        <Button
          variant='contained'
          onClick={() => setShowMenu(!showMenu)}
          sx={{
            textTransform: 'capitalize',
            background: '#172554',
            width: { xs: 'auto', sm: '150px' },
            fontSize: '20px',
          }}
        >
          Filter
        </Button>
        <div className='flex items-center gap-4'>
          <span className='text-[20px] text-blue-900 font-semibold hidden md:block'>
            Sort By
          </span>
          <FormControl
            sx={{
              '& .MuiSelect-icon': {
                display: 'none',
              },
              '& .MuiSelect-select': {
                paddingRight: '0',
              },
            }}
          >
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              defaultValue={filterType}
              sx={{
                '& .MuiSelect-select': {
                  paddingRight: '0',
                },
                padding: -0,
              }}
              value={filterType}
              onChange={handleChange}
            >
              {filterTypes.map((filter) => (
                <MenuItem
                  key={filter.value}
                  value={filter.value}
                >
                  {filter.icon && (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      {filter.label}
                      {filter.icon}
                    </span>
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {showMenu && (
        <div className='mt-4 md:mt-10 bg-white p-4'>
          <span className='text-[20px] font-semibold mb-4 block'>
            Toppings:
          </span>
          <div className='flex gap-4 lg:gap-10 flex-wrap'>
            {filterToppings &&
              filterToppings.map((filter) => (
                <div
                  className='flex items-center'
                  key={filter}
                >
                  <Checkbox
                    size='large'
                    onChange={(e) => {
                      if (e.target.checked) {
                        onSetFilterToppingSelected([
                          ...filterToppingSelected,
                          filter,
                        ]);
                      } else {
                        onSetFilterToppingSelected(
                          filterToppingSelected.filter(
                            (item) => item !== filter
                          )
                        );
                      }
                    }}
                  />
                  <span className='text-blue-900 text-[20px] capitalize'>
                    {filter}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
