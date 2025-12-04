// Keep data for costructing fields separate
import { dynamicFieldsData } from './dynamicFieldsData.js';
// Namespace for constructing svgs
const svgns = 'http://www.w3.org/2000/svg';

const fieldOrder = [
  'materialtype',
  'area',
  'type',
  'mounting',
  'size',
  'padding',
];

// Default formData
const formData = {
  values: { area: { category: 'Angiv terrasseareal i m²', value: 50 } },
};

// Reset on reloading, fields tends to keep their values
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.checked = false;
  });
  document.querySelector("input[type='range']").value = 50;
  document.querySelector("input[type='number']").value = 50;
  updateTrackBackground();
});

// Handler for saving inputs data
const handleChange = event => {
  if (
    event.target.matches(
      'input[type="radio"], input[type="range"], input[type="number"]'
    )
  ) {
    // User selected different material type, reconstruct dynamic fields
    if (event.target.name === 'materialtype') {
      // Initially hidden, show after first input
      document.getElementById('area').classList.add('visible');
      updateDynamicFields(event.target.value);
    }

    formData.values[event.target.name] = {
      ...formData.values[event.target.name],
      value: event.target.value,
    };

    if (event.target.dataset.category) {
      formData.values[event.target.name] = {
        ...formData.values[event.target.name],
        category: event.target.dataset.category,
      };
    }

    // Padding have an icon in summary, treat differently
    if (event.target.dataset.label) {
      if (event.target.name !== 'padding') {
        formData.values[event.target.name] = {
          ...formData.values[event.target.name],
          label: event.target.dataset.label,
        };
      } else {
        formData.values[event.target.name] = {
          ...formData.values[event.target.name],
          label: event.target.value > 0 ? true : false,
        };
      }
    }

    updateSummary();
    updateCalculations();
  }
};

document.body.addEventListener('change', handleChange);

// Update fields based on type selected
const updateDynamicFields = materialtype => {
  const container = document.getElementById('dynamic-fields');

  // Clear previous content
  container.innerHTML = '';

  // Get array of sections
  const sections = constructSection(dynamicFieldsData[materialtype]);
  sections.map(section => {
    container.appendChild(section);
  });

  const paddingSection = constructSection(dynamicFieldsData.padding)[0];
  container.appendChild(paddingSection);

  // Clear form data
  // We clear before new materialtype is written, so its fine
  formData.values = { area: formData.values.area };
  container.classList.add('visible');
  updateSummary();
};

// Function for construction section
const constructSection = data => {
  const sections =
    // I dont like too many innerHTML manipulations, so
    data.map(section => {
      // Create section
      const newSection = document.createElement('section');
      newSection.className = 'section';
      newSection.id = section.id;

      // Create heading
      const sectionHeading = document.createElement('h2');
      sectionHeading.className = 'section-title';
      sectionHeading.textContent = section.sectionTitle;
      newSection.appendChild(sectionHeading);

      // In case there's extra text
      if (section.description) {
        const sectionDescr = document.createElement('p');
        sectionDescr.textContent = section.description;
        sectionDescr.className = 'section-descr';
        newSection.appendChild(sectionDescr);
      }

      // Create item list wrapper
      const fieldset = document.createElement('fieldset');
      fieldset.className = 'field-grid';

      // Create labels for each field
      section.fields.forEach(field => {
        // Label element
        const label = document.createElement('label');
        label.className = 'option';
        label.setAttribute('for', field.id);

        // Input element
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = field.id;
        input.name = section.id;
        input.value = field.price;
        input.setAttribute('data-category', section.sectionTitle);
        input.setAttribute('data-label', field.label);

        // Img element
        const img = document.createElement('img');
        img.src = `assets/${field.image.x1}`;
        img.srcset = `assets/${field.image.x1} x1, assets/${field.image.x2} x2`;
        img.alt = field.id;
        img.loading = 'lazy';
        img.width = img.height = 157;
        img.className = 'option-image';

        // Label with text and button
        const labelContainner = document.createElement('div');
        labelContainner.className = 'option-label-container';

        const iconContainer = document.createElement('div');
        iconContainer.className = 'check-icon-container';
        const checkIcon = document.createElementNS(svgns, 'svg');
        checkIcon.classList.add('check-icon');
        const checkIconContent = document.createElementNS(svgns, 'use');
        checkIconContent.setAttributeNS(
          null,
          'href',
          'assets/sprites.svg#icon-tick'
        );

        const span = document.createElement('span');
        span.className = 'option-label';
        span.textContent = field.label;

        // Construct everything
        checkIcon.appendChild(checkIconContent);
        iconContainer.appendChild(checkIcon);
        labelContainner.appendChild(iconContainer);
        labelContainner.appendChild(span);

        label.appendChild(input);
        label.appendChild(img);
        label.appendChild(labelContainner);

        fieldset.appendChild(label);
      });

      newSection.appendChild(fieldset);
      return newSection;
    });
  return sections;
};

// Updating summary section
const updateSummary = () => {
  document.getElementById('summary').classList.remove('hidden');
  const container = document.getElementById('summary-table');
  container.innerHTML = '';
  fieldOrder.forEach(key => {
    if (formData.values[key]) {
      const tableRow = document.createElement('tr');
      const label = formData.values[key].category
        ? formData.values[key].category
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
        : key;
      const labelElement = document.createElement('td');
      labelElement.className = 'summary-label';
      const valueElement = document.createElement('td');
      valueElement.className = 'summary-value';
      labelElement.textContent = label;

      if (key === 'padding') {
        // Since we have an svg for padding, consctruct it here
        const iconContainer = document.createElement('div');
        iconContainer.className = 'check-icon-summary';
        const checkIcon = document.createElementNS(svgns, 'svg');
        checkIcon.classList.add('check-icon');
        const checkIconContent = document.createElementNS(svgns, 'use');
        if (formData.values[key].label) {
          checkIconContent.setAttributeNS(
            null,
            'href',
            'assets/sprites.svg#icon-tick'
          );
        } else {
          checkIconContent.setAttributeNS(
            null,
            'href',
            'assets/sprites.svg#icon-blocked'
          );
        }

        checkIcon.appendChild(checkIconContent);
        iconContainer.appendChild(checkIcon);
        valueElement.appendChild(iconContainer);
      } else {
        valueElement.textContent = formData.values[key].label
          ? formData.values[key].label
          : `${formData.values[key].value} m²`;
      }

      tableRow.appendChild(labelElement);
      tableRow.appendChild(valueElement);
      container.appendChild(tableRow);
    }
  });
};

// Update calculations
const updateCalculations = () => {
  const prices = Object.entries(formData.values)
    .filter(([key, { value }]) => key !== 'area' && !isNaN(Number(value)))
    .map(([_, { value }]) => Number(value));

  const total =
    formData.values.area.value * prices.reduce((acc, price) => acc + price, 0);

  // Show calculations only if user checked any items with prices
  if (total > 0) {
    document.getElementById('calculated').classList.remove('hidden');
    const totalfield = document.getElementById('calculated-value');
    totalfield.textContent = `ca. ${total.toLocaleString()} kr.`;
  } else {
    document.getElementById('calculated').classList.add('hidden');
  }
};

// Area section
// Making own range input and syncing with number input here
const areaInput = document.getElementById('area-input');
const areaRange = document.getElementById('area-range');

areaInput.addEventListener('input', function () {
  const min = parseInt(this.min);
  const max = parseInt(this.max);
  let value = parseInt(this.value);
  if (value > max) {
    this.value = max;
  }
  if (value < min) {
    this.value = min;
  }
  areaRange.value = this.value;
  updateTrackBackground();
});

const popup = document.getElementById('range-popup');
const valueSpan = document.getElementById('range-popup-value');
const track = document.getElementById('slider-fill');

function updateValue() {
  valueSpan.textContent = `${areaRange.value} m²`;
  areaInput.value = areaRange.value;
  updateTrackBackground();
}
function updateTrackBackground() {
  const percent =
    ((areaRange.value - areaRange.min) / (areaRange.max - areaRange.min)) * 100;
  if (track) {
    track.style.setProperty('--percent', percent + '%');
  }
}

function updatePopupPosition() {
  const percent =
    (areaRange.value - areaRange.min) / (areaRange.max - areaRange.min);
  const thumbSize = 16; // thumb is 16px
  const thumbPosition =
    percent * (areaRange.clientWidth - thumbSize) + thumbSize / 2;

  popup.style.left = thumbPosition + 'px';
}

areaRange.addEventListener('input', function () {
  updateValue();
  updatePopupPosition();
});

areaRange.addEventListener('mousedown', () => {
  popup.style.opacity = '1';
});

areaRange.addEventListener('mouseup', () => {
  popup.style.opacity = '0';
});

areaRange.addEventListener('touchstart', () => {
  popup.style.opacity = '1';
});

areaRange.addEventListener('touchend', () => {
  popup.style.opacity = '0';
});
