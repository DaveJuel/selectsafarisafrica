import { useTranslation } from "react-i18next";
import {
  ActivityContent,
  ActivityDescription,
  ActivityHeader,
  ActivityItem,
  DayBadge,
  EditIconWrapper,
  HeaderLeft,
  IconButton,
  Select,
  TimeTag,
} from "../../style/itineraries.list.view.styles";

import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";

const ItineraryListViewItem = ({
    item,
    index,
    editingId,
    handleChange,
    timeOptions,
    confirmEditActivity,
    cancelEditActivity,
    handleEditActivity,
    handleDeleteActivity,
    activityOptions
}) => {
    const { t } = useTranslation("itineraries");
    return (
        <ActivityItem key={index}>
            <ActivityContent>
                <ActivityHeader>
                    <HeaderLeft>
                        <DayBadge>{t("day")} {item?.day}</DayBadge>
                        {editingId === item.id ? (
                            <Select
                                value={item.time}
                                onChange={(e) => handleChange(item.id, "time", e.target.value)}
                            >
                                {timeOptions.map((opt) => (
                                    <option key={opt.id} value={opt.time}>
                                        {opt.time}
                                    </option>
                                ))}
                            </Select>
                        ) : (
                            <TimeTag>{item.time}</TimeTag>
                        )}
                    </HeaderLeft>

                    {editingId === item.id ?
                        (
                            <EditIconWrapper>
                                <IconButton
                                    color="#2d5a2d"
                                    onClick={() => confirmEditActivity()}
                                >
                                    <FaCheck />
                                </IconButton>

                                <IconButton
                                    color="#c0392b"
                                    onClick={() => cancelEditActivity()}
                                >
                                    <FaXmark />
                                </IconButton>
                            </EditIconWrapper>
                        ) :
                        (
                            <EditIconWrapper>
                                <IconButton
                                    color="#2d5a2d"
                                    onClick={() => handleEditActivity(item)}
                                >
                                    <FiEdit2 />
                                </IconButton>

                                <IconButton
                                    color="#c0392b"
                                    onClick={() => handleDeleteActivity(item)}
                                >
                                    <FaXmark />
                                </IconButton>
                            </EditIconWrapper>
                        )
                    }
                </ActivityHeader>
                {editingId === item.id ? (
                    <Select
                        value={item.activity}
                        onChange={(e) =>
                            handleChange(item.id, "activity", e.target.value)
                        }
                    >
                        {activityOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </Select>
                ) : (
                    <ActivityDescription>{item?.activity}</ActivityDescription>
                )}
            </ActivityContent>
        </ActivityItem>
    );
}

export default ItineraryListViewItem;