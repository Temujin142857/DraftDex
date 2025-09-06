import { useState, useEffect, useRef } from 'react';

const StatChangeDropdown = ({ selected = 0, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const numbers = Array.from({ length: 13 }, (_, i) => i - 6);

  const handleSelect = (newValue) => {
    if (onChange) onChange(newValue);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);


  const above = numbers.filter((n) => n > selected).reverse();
  const below = numbers.filter((n) => n < selected);

  return (
    <div ref={dropdownRef} style={{ width: '30px', margin: 'auto', position: 'relative', fontFamily: 'Arial' }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          border: '1px solid #ccc',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: '#f9f9f9',
        }}
      >
        {selected >= 0 ? `+${selected}` : selected}
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            width: '150%',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            zIndex: 1,
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {above.map((n) => (
            <div
              key={n}
              onClick={() => handleSelect(n)}
              style={{
                padding: '8px',
                textAlign: 'center',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
              }}
            >
              {n >= 0 ? `+${n}` : n}
            </div>
          ))}

          <div
            style={{
              padding: '8px',
              textAlign: 'center',
              fontWeight: 'bold',
              backgroundColor: '#efefef',
              borderTop: '1px solid #ddd',
              borderBottom: '1px solid #ddd',
            }}
          >
            {selected >= 0 ? `+${selected}` : selected}
          </div>

          {below.map((n) => (
            <div
              key={n}
              onClick={() => handleSelect(n)}
              style={{
                padding: '8px',
                textAlign: 'center',
                borderTop: '1px solid #eee',
                cursor: 'pointer',
              }}
            >
              {n >= 0 ? `+${n}` : n}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatChangeDropdown;
