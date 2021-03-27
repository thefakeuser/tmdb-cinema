<template>
  <v-form
    :disabled="isDisabled"
    @submit.prevent="submit"
  >
    <v-row>
      <v-col
        md="4"
        cols="12"
      >
        <v-row>
          <v-col
            cols="12"
            sm="4"
            class="d-flex align-center"
            :class="{ 'justify-end': $vuetify.breakpoint.mdAndUp }"
          >
            <span>
              Year:
            </span>
          </v-col>

          <v-col
            cols="12"
            sm="4"
            class="d-flex align-center"
          >
            <v-menu
              v-model="isminYearActive"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  :value="value.minYear"
                  label="from"
                  hide-details
                  readonly
                  solo
                  v-bind="attrs"
                  v-on="on"
                />
              </template>

              <v-date-picker
                ref="minYearPicker"
                v-bind="minYearPickerAllowedYears"
                :value="value.minYear"
                type="month"
                @click:year="selectMinYear"
              />
            </v-menu>
          </v-col>

          <v-col
            cols="12"
            sm="4"
            class="d-flex align-center"
          >
            <v-menu
              v-model="ismaxYearActive"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  :value="value.maxYear"
                  label="to"
                  hide-details
                  readonly
                  solo
                  v-bind="attrs"
                  v-on="on"
                />
              </template>

              <v-date-picker
                ref="maxYearPicker"
                v-bind="maxYearPickerAllowedYears"
                :value="value.maxYear"
                type="month"
                @click:year="selectMaxYear"
              />
            </v-menu>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        md="4"
        cols="12"
      >
        <v-row>
          <v-col
            cols="12"
            sm="4"
            class="d-flex align-center"
            :class="{ 'justify-end': $vuetify.breakpoint.mdAndUp }"
          >
            <span>
              Rating:
            </span>
          </v-col>

          <v-col
            cols="12"
            sm="4"
            class="d-flex align-center"
          >
            <v-select
              v-model="minRatingValue"
              :items="minAllowedRating"
              label="from"
              hide-details
              solo
            />
          </v-col>

          <v-col
            cols="12"
            sm="4"
            class="d-flex align-center"
          >
            <v-select
              v-model="maxRatingValue"
              :items="maxAllowedRating"
              label="to"
              hide-details
              solo
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-row>
          <v-col
            cols="12"
            sm="8"
          >
            <v-text-field
              v-model="searchQuery"
              label="Search"
              hide-details
              solo
            />
          </v-col>

          <v-col
            cols="12"
            sm="4"
            class="d-flex align-center justify-center"
          >
            <v-btn
              text
              type="submit"
              class="pa-0"
              :disabled="!isAnyFilterApplied"
            >
              <v-icon color="primary" class="pa-0">
                mdi-magnify
              </v-icon>
            </v-btn>

            <v-btn
              text
              color="primary"
              class="pa-0"
              :disabled="!isAnyFilterApplied"
              @click="clear"
            >
              Clear
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { FilterForm } from '~/contracts/movie'

interface DatePickerYearLimits {
  min: string;
  max: string;
}

@Component
export default class MoviesFilterForm extends Vue {
  @Prop() readonly isDisabled!: boolean
  @Prop() readonly value!: FilterForm

  $refs!: {
    maxYearPicker: HTMLFormElement
    minYearPicker: HTMLFormElement
  }

  defaultRatingValues: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  isminYearActive: boolean = false
  ismaxYearActive: boolean = false

  get isAnyFilterApplied (): boolean {
    const formValues = [
      this.value.minYear,
      this.value.maxYear,
      this.value.searchQuery,
      this.value.maxRating,
      this.value.minRating
    ]

    return formValues.some(Boolean)
  }

  get maxYearPickerAllowedYears (): DatePickerYearLimits {
    return {
      min: this.value.minYear ? `${this.value.minYear}` : '1900',
      max: `${new Date().getFullYear()}`
    }
  }

  get minYearPickerAllowedYears (): DatePickerYearLimits {
    return {
      min: '1900',
      max: this.value.maxYear ? `${this.value.maxYear}` : `${new Date().getFullYear()}`
    }
  }

  get maxAllowedRating (): Array<number> {
    return this.defaultRatingValues.filter((value: number) => value >= (this.value.minRating || 0))
  }

  get minAllowedRating (): Array<number> {
    return this.defaultRatingValues.filter((value: number) => value <= (this.value.maxRating || 10))
  }

  get minRatingValue (): number | undefined {
    return this.value.minRating
  }

  set minRatingValue (value: number | undefined) {
    this.input('minRating', value)
  }

  get maxRatingValue (): number | undefined {
    return this.value.maxRating
  }

  set maxRatingValue (value: number | undefined) {
    this.input('maxRating', value)
  }

  get searchQuery (): string | undefined {
    return this.value.searchQuery
  }

  set searchQuery (value: string | undefined) {
    this.input('searchQuery', value)
  }

  selectMaxYear (value: number): void {
    this.ismaxYearActive = false
    this.input('maxYear', `${value}`)
  }

  selectMinYear (value: number): void {
    this.isminYearActive = false
    this.input('minYear', `${value}`)
  }

  @Emit()
  input (key: string, value: string | number | undefined): FilterForm {
    return {
      ...this.value,
      [key]: value
    }
  }

  @Emit()
  clear () {}

  @Emit()
  submit () {}

  /**
   * v-date-picker component does not provide a feature to select a year only.
   * The most rough way it's YYYY-MM using type='month' attr.
   * So, control the component here, setting `activePicker = 'YEAR'` every time
   * when its flag is touched. The component never must show month picker.
   */

  @Watch('isminYearActive')
  onStartedDateChanged (): void {
    this.$nextTick(() => {
      const { minYearPicker } = this.$refs
      minYearPicker.activePicker = 'YEAR'
    })
  }

  @Watch('ismaxYearActive')
  onmaxYearChanged (): void {
    this.$nextTick(() => {
      const { maxYearPicker } = this.$refs
      maxYearPicker.activePicker = 'YEAR'
    })
  }
}
</script>
