import { mount } from '@vue/test-utils';
import { enableFetchMocks } from "jest-fetch-mock";
import ProductDisplay from '@/components/ProductDisplay.vue'

enableFetchMocks();

describe('ProductDisplay.vue', () => {
  it("renders correctly", () => {
    const wrapper = mount(ProductDisplay);
    expect(wrapper.exists()).toBe(true);
  });

  it('updates idProduct when Next button is clicked', async () => {
    const wrapper = mount(ProductDisplay);

    await wrapper.setData({ idProduct: 2 });
    await wrapper.find("#btn-next").trigger('click');

    expect(wrapper.vm.idProduct).toBe(2);
  });

  it("calls getProduct and processes data correctly", async () => {
    const wrapper = mount(ProductDisplay);

    const mockResponse = {
      json: jest.fn().mockResolvedValue({
        id: 1,
        title: "Product 1",
      }),
    };

    fetch.mockResolvedValueOnce(mockResponse);

    const setProductSpy = jest.spyOn(wrapper.vm, 'setProduct');

    await wrapper.vm.getProduct(1);

    expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products/1");

    expect(setProductSpy).toHaveBeenCalledWith({
      id: 1,
      title: "Product 1",
    });

    expect(wrapper.vm.isLoadData).toBe(false);

    setProductSpy.mockRestore();

    fetch.mockReset();
  });

})
