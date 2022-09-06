<template>
  <div>
    <div class="form-group row align-items-center">
      <label class="col-sm-2 col-form-label">Id </label>
      <div class="col-sm-6">
        <input v-model="keySearch" type="text" class="form-control" />
      </div>
      <b-button variant="primary" class="col-sm-1" @click="onSearch"
        ><i class="fas fa-search text-white"></i
      ></b-button>
    </div>
    <Skeleton :loading="isLoading" />
    <b-alert
      v-model="showAlert"
      class="mt-2"
      dismissible
      :variant="variantAlert"
      >{{ alertMessage }}</b-alert
    >
    <div v-if="dataSet !== null">
      <div v-if="dataSet.data !== null">
        <div class="form-group row align-items-center">
          <label class="col-sm-3 col-form-label">Id </label>
          <div class="col-sm-8">
            {{ dataSet.data.id }}
          </div>
        </div>
        <div class="form-group row align-items-center">
          <label class="col-sm-3 col-form-label">Area </label>
          <div class="col-sm-8">
            {{ dataSet.origin }}
          </div>
        </div>
        <div
          v-if="dataSet.origin !== 'Provinsi'"
          class="form-group row align-items-center"
        >
          <label class="col-sm-3 col-form-label">
            {{
              dataSet.origin === 'Kecamatan'
                ? 'Kota Id'
                : dataSet.origin === 'Kelurahan'
                ? 'Kecamatan Id'
                : 'Provinsi Id'
            }}
          </label>
          <div class="col-sm-8">
            {{
              dataSet.origin === 'Kecamatan'
                ? dataSet.data.kota_id
                : dataSet.origin === 'Kelurahan'
                ? dataSet.data.kecamatan_id
                : dataSet.data.provinsi_id
            }}
          </div>
        </div>
        <div class="form-group row align-items-center">
          <label class="col-sm-3 col-form-label">Nama </label>
          <div class="col-sm-8">
            {{ dataSet.data.nama }}
          </div>
        </div>
      </div>
      <div v-else class="text-primary d-flex justify-content-center">
        There's no Data
      </div>
    </div>
  </div>
</template>

<script>
import { Skeleton } from 'vue-loading-skeleton'
import { KasirPintarService } from '../../services/kasir.service.js'
export default {
  components: {
    Skeleton,
  },
  data() {
    return {
      keySearch: null,
      dataSet: null,
      isLoading: false,
      variantAlert: 'success',
      showAlert: false,
      alertMessage: null,
    }
  },
  methods: {
    async onSearch() {
      this.isLoading = true
      this.showAlert = false
      try {
        const res = await KasirPintarService.fetchDetailById({
          id: this.keySearch,
        })
        if (res) {
          this.dataSet = res.data
        }
      } catch (error) {
        if (error.response.data) {
          this.alertMessage = error.response.data
          this.variantAlert = 'danger'
          this.showAlert = true
        }
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
