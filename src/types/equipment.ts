export type EquipmentInfo = {
    id: string;
    name: string;
    description: string | null;
    amount: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    create_user_id: string;
    update_user_id: string;
    delete_user_id: string | null;
};