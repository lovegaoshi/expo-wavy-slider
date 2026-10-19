import { requireNativeModule } from "expo";
import { SharedObject } from "expo-modules-core";
import { Platform } from "react-native";

type NativeSharedObject = InstanceType<typeof SharedObject>;

class ExpoWavySliderModule {
  // @ts-expect-error side effect for removing the declare kw
  ObservableState: new (initial: { value: unknown }) => NativeSharedObject & {
    getValue(): unknown;
    setValue(value: { value: unknown }): void;
    setOnChange(callback: object | null): void;
  };
  // @ts-expect-error side effect for removing the declare kw
  WorkletCallback: new (worklet: object | null) => NativeSharedObject & {
    setWorklet(worklet: object | null): void;
  };
}

const unsupportedPlatformModule = new Proxy(
  {},
  {
    get() {
      throw new Error(
        "[expo-wavy-slider] WavySlider is only implemented on Android.",
      );
    },
  },
) as ExpoWavySliderModule;

export default Platform.OS === "android"
  ? requireNativeModule<ExpoWavySliderModule>("ExpoWavySlider")
  : unsupportedPlatformModule;
