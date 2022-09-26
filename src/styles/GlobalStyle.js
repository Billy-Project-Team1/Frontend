import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import '../common/color.scss'
const GlobalStyles = createGlobalStyle`

  .rmdp-wrapper,
  .rmdp-top-class {
  width: 358px;
}
.rmdp-calendar {
  width: 100%;
  height: 100%;
  padding: 30px 0 10px;
}
.rmdp-day-picker {
  display: block !important;
  width: 100%;
  height: 100%;
  margin: 10px 10px 0 0;
}
  .rmdp-day-picker > div,
  .rmdp-day, .rmdp-week-day,
  .rmdp-day span,
  .rmdp-day.rmdp-today span,
  .rmdp-day.rmdp-disabled.rmdp-today span,
  .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover,
  .rmdp-day.rmdp-selected span:not(.highlight),
  .rmdp-day.rmdp-selected span:not(.highlight):hover,

  .rmdp-border {
  border: none;
}

  .rmdp-arrow {
  color: #212121;
}
.rmdp-arrow-container.disabled {
  color: #CCCCCC;
}
.rmdp-day.rmdp-disabled {
  color: #CCCCCC;
}
.rmdp-header-values {
  color: #212121;
  font-size: 1.125rem;
  font-weight: 600;
}
.rmdp-day {
  width: 35px;
  height: 35px;
  background-color: #ffffff;
  padding: 20px;

  span {
    font-size: 0.875rem;
    width: 35px;
    height: 35px;
  }
}
.rmdp-week-day {
  color: #757575;
  font-size: 0.875rem;
}
.rmdp-day.rmdp-today span {
  border: 1px solid #004EEA;
  background-color: transparent;
  color: #212121;
  font-size: 0.875rem;
}
.rmdp-day.rmdp-selected span:not(.highlight) {
  background-color: #004EEA;
  color: #eeeeee;
  font-size: 0.875rem;
  padding-bottom: 1px;
  width: 35px;
  height: 35px;
}
.rmdp-arrow-container:hover .rmdp-arrow {
  border-color: #212121;
}
.rmdp-arrow-container:hover {
  background-color: transparent;
  box-shadow: none;
}
.rmdp-week {
  padding-bottom: 18px;
}
.rmdp-wrapper {
  margin: auto;
}
.rmdp-wrapper.rmdp-shadow {
  box-shadow: none;
}
.rmdp-range {
  border-radius: 50%;
  color: #F7F7F7;
  width: 35px;
  height: 35px;
  background-color: #004EEA;
  padding: 20px;
}

.rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover {
  box-shadow: none;
  background-color: transparent;
  color: #212121
}
.rmdp-day.rmdp-range span:not(.highlight),
.rmdp-day.rmdp-range span:not(.highlight):hover {
  box-shadow: none;
  background-color: #004EEA;
  color: #ffffff;
}
.rmdp-day.rmdp-selected span:not(.highlight),
.rmdp-day.rmdp-selected span:not(.highlight):hover {
  box-shadow: none;
  background-color: #004EEA;
  color: #ffffff;
}
.rmdp-disabled {
  pointer-events: none;
}
  
`;

export default GlobalStyles;
