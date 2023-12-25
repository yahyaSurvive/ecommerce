import { mount } from '@vue/test-utils'
import ProductDisplay from '@/components/ProductDisplay.vue'

describe('ProductDisplay.vue', () => {
  it('updates idProduct when Next button is clicked', async () => {
    const wrapper = mount(ProductDisplay);

    await wrapper.setData({ idProduct: 2 });
    await wrapper.find("#btn-next").trigger('click');

    expect(wrapper.vm.idProduct).toBe(2);
  });
})
