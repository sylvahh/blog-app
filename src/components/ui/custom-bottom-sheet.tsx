import React, { useCallback, useMemo, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

type BottomSheetModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  snapIndex?: number;
};

type BottomSheetRef = BottomSheet;

const CustomBottomSheetModal = forwardRef<BottomSheetRef, BottomSheetModalProps>(
  ({ snapIndex, children, onClose }, ref) => {
    const bottomsheetRef = React.useRef<BottomSheet>(null);

    const renderBackdrop = React.useCallback(
      (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
      []
    );

    React.useEffect(() => {
      return () => {
        bottomsheetRef.current?.close();
      };
    }, []);

    const snapPoints = useMemo(() => ['25%', '30%', '50%', '60%', '75%', '90%'], []);

    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);

    return (
      <React.Fragment>
        <BottomSheet
          ref={ref}
          index={snapIndex !== undefined ? snapIndex : 2}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          onClose={onClose}
          enablePanDownToClose>
          <View style={styles.contentContainer}>{children}</View>
        </BottomSheet>
      </React.Fragment>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    margin: 10,
    gap: 10,
  },
});

export default CustomBottomSheetModal;
